import { useState } from "react";
import { useReferral } from "@/context/ReferralContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Copy,
  Share2,
  Users,
  TrendingUp,
  Gift,
  CheckCircle2,
  Clock,
  Zap,
  MessageCircle,
} from "lucide-react";
import { toast } from "sonner";

export default function ReferralProgram() {
  const { stats, claimRewards } = useReferral();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(stats.referralLink);
    setCopied(true);
    toast.success("Referral link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(stats.referralCode);
    toast.success("Referral code copied!");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join Extreme Life Herbal Products",
          text: `Use my referral code ${stats.referralCode} to get ₱200 welcome credit!`,
          url: stats.referralLink,
        });
      } catch (err) {
        console.log("Share failed", err);
      }
    }
  };

  const handleClaimRewards = () => {
    claimRewards();
    toast.success("Rewards claimed successfully!");
  };

  const statusColor = {
    pending: "bg-yellow-100 text-yellow-800",
    active: "bg-blue-100 text-blue-800",
    rewarded: "bg-green-100 text-green-800",
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold font-serif text-foreground mb-2">Referral Program</h1>
          <p className="text-lg text-muted-foreground">
            Earn rewards for every friend who joins. It's a win-win for everyone!
          </p>
        </div>

        {/* Referral Card */}
        <Card className="mb-12 overflow-hidden border-accent/30 bg-gradient-to-br from-accent/5 to-primary/5">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Left Side - Your Code */}
              <div>
                <h2 className="text-2xl font-bold font-serif text-foreground mb-4">Your Referral Code</h2>
                <p className="text-muted-foreground mb-6">Share this code with friends to earn rewards</p>

                <div className="space-y-3">
                  {/* Code Display */}
                  <div className="p-4 bg-card border-2 border-primary rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">CODE</p>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-3xl font-bold font-mono text-primary">{stats.referralCode}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCopyCode}
                        className="hover:bg-primary/10"
                      >
                        <Copy className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Link */}
                  <div className="p-4 bg-card border border-border rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">REFERRAL LINK</p>
                    <div className="flex items-center gap-2 mb-2">
                      <code className="text-xs bg-muted p-2 rounded flex-1 truncate">{stats.referralLink}</code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCopyLink}
                        className="hover:bg-primary/10"
                      >
                        {copied ? "✓" : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  {/* Share Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1 gap-2" onClick={handleShare}>
                      <Share2 className="h-4 w-4" />
                      Share with Friends
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <MessageCircle className="h-4 w-4" />
                      Message
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right Side - How It Works */}
              <div className="bg-card p-6 rounded-lg border border-border">
                <h3 className="font-bold text-lg mb-4">How It Works</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                        1
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Share your code</p>
                      <p className="text-xs text-muted-foreground">Send to friends via message or social media</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                        2
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">They join & shop</p>
                      <p className="text-xs text-muted-foreground">Friend signs up using your code</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                        3
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">You both earn</p>
                      <p className="text-xs text-muted-foreground">Get ₱200 per successful referral</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Users className="h-4 w-4" />
                Total Referrals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.totalReferrals}</div>
              <p className="text-xs text-green-600 mt-2">+2 this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Active Referrals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{stats.activeReferrals}</div>
              <p className="text-xs text-muted-foreground mt-2">Actively shopping</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Gift className="h-4 w-4" />
                Total Earned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">₱{stats.totalEarnings.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-2">All-time earnings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Pending Rewards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">₱{stats.pendingEarnings.toLocaleString()}</div>
              <Button
                size="sm"
                className="w-full mt-2 h-7 text-xs"
                onClick={handleClaimRewards}
                disabled={stats.pendingEarnings === 0}
              >
                Claim Now
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Rewards Tier */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Rewards Tier</CardTitle>
            <CardDescription>Unlock higher rewards as you refer more friends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg border-2 border-primary bg-primary/5">
                <p className="text-sm font-bold mb-2">Bronze</p>
                <p className="text-2xl font-bold text-primary mb-2">₱200</p>
                <p className="text-xs text-muted-foreground">1-3 referrals</p>
              </div>
              <div className="p-4 rounded-lg border-2 border-accent bg-accent/5">
                <p className="text-sm font-bold mb-2">Silver</p>
                <p className="text-2xl font-bold text-accent mb-2">₱250</p>
                <p className="text-xs text-muted-foreground">4-7 referrals</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="text-sm font-bold mb-2">Gold</p>
                <p className="text-2xl font-bold text-yellow-600 mb-2">₱300</p>
                <p className="text-xs text-muted-foreground">8-15 referrals</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="text-sm font-bold mb-2">Platinum</p>
                <p className="text-2xl font-bold text-blue-600 mb-2">₱400</p>
                <p className="text-xs text-muted-foreground">16+ referrals</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Referral History */}
        <Card>
          <CardHeader>
            <CardTitle>Referral History</CardTitle>
            <CardDescription>Track your referrals and their purchase activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.referrals.map((referral) => (
                <div key={referral.id} className="p-4 rounded-lg border border-border hover:bg-muted/30 transition">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <p className="font-bold text-foreground">{referral.referreeName}</p>
                      <p className="text-sm text-muted-foreground">{referral.referreeEmail}</p>
                    </div>
                    <Badge className={`${statusColor[referral.status]} border-0 text-xs`}>
                      {referral.status.charAt(0).toUpperCase() + referral.status.slice(1)}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground text-xs">Joined</p>
                      <p className="font-semibold">
                        {new Date(referral.joinDate).toLocaleDateString("en-PH")}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Purchases</p>
                      <p className="font-semibold">{referral.purchaseCount}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Total Spent</p>
                      <p className="font-semibold">₱{referral.totalSpent.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Your Reward</p>
                      <p className="font-semibold text-green-600">
                        ₱{referral.status === "rewarded" ? "200" : referral.status === "active" ? "Pending" : "-"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
