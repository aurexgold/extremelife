import { useState } from "react";
import { useEmailNotification } from "@/context/EmailNotificationContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Send, TrendingUp, CheckCircle, AlertCircle, Clock, Eye, Edit, Trash2, Plus } from "lucide-react";

export default function AdminEmailNotifications() {
  const { templates, logs, getEmailStats, updateTemplate } = useEmailNotification();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const stats = getEmailStats();

  const currentTemplate = selectedTemplate ? templates.find(t => t.id === selectedTemplate) : null;

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      order_confirmation: "bg-blue-100 text-blue-800",
      shipping: "bg-purple-100 text-purple-800",
      delivery: "bg-green-100 text-green-800",
      abandoned_cart: "bg-orange-100 text-orange-800",
      loyalty_points: "bg-pink-100 text-pink-800",
      referral: "bg-indigo-100 text-indigo-800",
      promotional: "bg-red-100 text-red-800",
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-orange-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background">
        <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Email Notifications</h1>
            <p className="text-sm text-muted-foreground">Manage templates and view sending logs</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Emails Sent</p>
                  <p className="text-3xl font-bold mt-2 text-green-600">{stats.totalSent}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600 opacity-30" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-3xl font-bold mt-2 text-orange-600">{stats.totalPending}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600 opacity-30" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Failed</p>
                  <p className="text-3xl font-bold mt-2 text-red-600">{stats.totalFailed}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-red-600 opacity-30" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="text-3xl font-bold mt-2 text-blue-600">{stats.successRate}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600 opacity-30" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="templates" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="templates">Templates ({templates.length})</TabsTrigger>
            <TabsTrigger value="logs">Sending Logs ({logs.length})</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          {/* Templates Tab */}
          <TabsContent value="templates">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle>Email Templates</CardTitle>
                  <CardDescription>Create and manage email templates</CardDescription>
                </div>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create Template
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {templates.map(template => (
                    <div
                      key={template.id}
                      className="border rounded-lg p-4 hover:bg-muted/50 transition cursor-pointer"
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <h3 className="font-semibold">{template.name}</h3>
                            <Badge className={getTypeColor(template.type)}>
                              {template.type.replace(/_/g, " ")}
                            </Badge>
                            {template.isActive && (
                              <Badge className="bg-green-100 text-green-800">Active</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Subject: {template.subject}
                          </p>
                          <div className="flex gap-2 flex-wrap">
                            {template.variables.map(v => (
                              <Badge key={v} variant="outline" className="text-xs">
                                {"{"}
                                {v}
                                {"}"}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedTemplate(template.id);
                              setPreviewMode(true);
                            }}
                            data-testid={`button-preview-template-${template.id}`}
                          >
                            <Eye className="h-3 w-3" />
                            Preview
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedTemplate(template.id);
                            }}
                          >
                            <Edit className="h-3 w-3" />
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="gap-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Logs Tab */}
          <TabsContent value="logs">
            <Card>
              <CardHeader>
                <CardTitle>Email Sending Logs</CardTitle>
                <CardDescription>Track all sent, pending, and failed emails</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold">Recipient</th>
                        <th className="text-left py-3 px-4 font-semibold">Subject</th>
                        <th className="text-left py-3 px-4 font-semibold">Template</th>
                        <th className="text-left py-3 px-4 font-semibold">Status</th>
                        <th className="text-left py-3 px-4 font-semibold">Sent At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {logs.map(log => (
                        <tr key={log.id} className="border-b hover:bg-muted/30 transition">
                          <td className="py-3 px-4 text-xs">{log.recipient}</td>
                          <td className="py-3 px-4 text-xs line-clamp-1">{log.subject}</td>
                          <td className="py-3 px-4 text-xs">
                            <Badge variant="outline">{log.template}</Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(log.status)}
                              <Badge
                                className={
                                  log.status === "sent"
                                    ? "bg-green-100 text-green-800"
                                    : log.status === "pending"
                                    ? "bg-orange-100 text-orange-800"
                                    : "bg-red-100 text-red-800"
                                }
                              >
                                {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                              </Badge>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-xs text-muted-foreground">
                            {new Date(log.sentAt).toLocaleString("en-PH")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preview Tab */}
          <TabsContent value="preview">
            {currentTemplate ? (
              <Card>
                <CardHeader>
                  <CardTitle>Template Preview: {currentTemplate.name}</CardTitle>
                  <CardDescription>This is how the email will appear to recipients</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-muted/50 border rounded-lg p-6 space-y-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Subject Line:</p>
                      <p className="font-semibold text-sm">{currentTemplate.subject}</p>
                    </div>
                    <div className="border-t pt-4">
                      <p className="text-xs text-muted-foreground mb-2">Email Body:</p>
                      <div className="bg-white p-6 rounded border text-sm whitespace-pre-wrap font-sans">
                        {currentTemplate.body}
                      </div>
                    </div>
                    <div className="border-t pt-4">
                      <p className="text-xs text-muted-foreground mb-2">Template Variables:</p>
                      <div className="flex flex-wrap gap-2">
                        {currentTemplate.variables.map(v => (
                          <Badge key={v} variant="outline">
                            {"{"}
                            {v}
                            {"}"}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-semibold mb-4">Send Test Email</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-medium mb-1 block">Test Email Address</label>
                        <Input
                          type="email"
                          placeholder="test@example.com"
                          data-testid="input-test-email"
                        />
                      </div>
                      <Button className="gap-2 w-full md:w-auto">
                        <Send className="h-4 w-4" />
                        Send Test Email
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-96 flex items-center justify-center">
                <CardContent className="text-center">
                  <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">Select a template to preview</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
