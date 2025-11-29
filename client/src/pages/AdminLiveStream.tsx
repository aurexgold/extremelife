import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AdminSidebar from "@/components/AdminSidebar";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Plus, Pause, Square, TrendingUp } from "lucide-react";

const streamData = [
  { time: "00:00", viewers: 120 },
  { time: "05:00", viewers: 350 },
  { time: "10:00", viewers: 650 },
  { time: "15:00", viewers: 1203 },
  { time: "20:00", viewers: 980 },
  { time: "25:00", viewers: 650 },
  { time: "30:00", viewers: 420 },
];

const sessionData = [
  { id: 1, title: "Wellness Wednesday: Benefits of Essential Oils", status: "Live", viewers: 847, duration: "15m", revenue: 18920 },
  { id: 2, title: "Tea Time with Sarah - Immune Boosting Blends", status: "Completed", viewers: 1203, duration: "45m", revenue: 34560 },
  { id: 3, title: "Skincare Secrets: Natural Body Care", status: "Completed", viewers: 892, duration: "32m", revenue: 22340 },
  { id: 4, title: "Sleep Better Naturally - Sleep Series #1", status: "Completed", viewers: 645, duration: "28m", revenue: 15680 },
];

export default function AdminLiveStream() {
  const [sessions] = useState(sessionData);
  const [showScheduleForm, setShowScheduleForm] = useState(false);

  const liveSession = sessions[0];
  const totalRevenue = sessions.reduce((sum, s) => sum + s.revenue, 0);
  const totalViewers = sessions.reduce((sum, s) => sum + s.viewers, 0);
  const avgViewers = Math.round(totalViewers / sessions.length);

  return (
    <div className="flex h-screen bg-muted/30">
      <AdminSidebar />

      <main className="flex-1 lg:ml-64 overflow-auto">
        <div className="p-4 md:p-8 space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Live Stream Management</h1>
              <p className="text-muted-foreground">Manage and monitor live selling sessions</p>
            </div>
            <Button onClick={() => setShowScheduleForm(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Schedule Stream
            </Button>
          </div>

          {/* Live Now Card */}
          {liveSession.status === "Live" && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-3 w-3 rounded-full bg-red-600 animate-pulse"></div>
                      <span className="font-bold text-red-700">LIVE NOW</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{liveSession.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">Viewers: <span className="font-semibold text-foreground">{liveSession.viewers.toLocaleString()}</span></p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                      <Pause className="h-4 w-4" />
                      Pause
                    </Button>
                    <Button variant="destructive" className="gap-2">
                      <Square className="h-4 w-4" />
                      End Stream
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stream Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-3xl font-bold mt-2">₱{(totalRevenue / 1000).toFixed(0)}k</p>
                <p className="text-xs text-green-600 mt-2">↑ 23% from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Total Viewers</p>
                <p className="text-3xl font-bold mt-2">{totalViewers.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-2">Avg {avgViewers.toLocaleString()} per stream</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Completed Streams</p>
                <p className="text-3xl font-bold mt-2">{sessions.filter(s => s.status === "Completed").length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Avg Session Duration</p>
                <p className="text-3xl font-bold mt-2">36m</p>
              </CardContent>
            </Card>
          </div>

          {/* Viewer Trend Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Live Stream Viewers Trend</CardTitle>
              <CardDescription>Real-time viewer count during current stream</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={streamData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="viewers" stroke="#2D4A3E" strokeWidth={2} dot={{ fill: '#2D4A3E', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Session History */}
          <Card>
            <CardHeader>
              <CardTitle>Stream History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sessions.map(session => (
                  <div key={session.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {session.status === "Live" && (
                            <div className="h-2 w-2 rounded-full bg-red-600 animate-pulse"></div>
                          )}
                          <h3 className="font-bold text-foreground">{session.title}</h3>
                          <Badge className={session.status === "Live" ? "bg-red-100 text-red-800 border-0" : "bg-green-100 text-green-800 border-0"}>
                            {session.status}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mt-2">
                          <span>👥 {session.viewers.toLocaleString()} viewers</span>
                          <span>⏱️ {session.duration}</span>
                          <span className="font-semibold text-green-600">₱{session.revenue.toLocaleString('en-PH')} revenue</span>
                        </div>
                      </div>
                      {session.status === "Completed" && (
                        <Button variant="outline" size="sm">View Replay</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
