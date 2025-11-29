import { useLoyalty } from "@/context/LoyaltyContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gift, Zap, TrendingUp, Target, Award, History } from "lucide-react";

export default function LoyaltyProgram() {
  const { stats, tiers, getCurrentTier, getPointsToNextTier, getNextTier } = useLoyalty();

  const currentTier = getCurrentTier();
  const nextTier = getNextTier();
  const pointsToNext = getPointsToNextTier();
  const progressPercent = nextTier
    ? Math.min(100, ((stats.currentPoints - (currentTier?.minPoints || 0)) / (nextTier.minPoints - (currentTier?.minPoints || 0))) * 100)
    : 100;

  const memberDays = Math.floor(
    (new Date().getTime() - new Date(stats.memberSince).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold font-serif text-foreground mb-2">Loyalty Points</h1>
          <p className="text-lg text-muted-foreground">
            Earn points on every purchase and unlock exclusive rewards
          </p>
        </div>

        {/* Current Status Card */}
        <Card className={`mb-12 overflow-hidden bg-gradient-to-br ${currentTier?.color} text-white border-0`}>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Left - Current Points */}
              <div>
                <h2 className="text-4xl font-bold font-serif mb-2">{currentTier?.name}</h2>
                <p className="text-white/80 mb-6">Member for {memberDays} days</p>

                <div className="bg-white/10 backdrop-blur p-6 rounded-lg border border-white/20 mb-4">
                  <p className="text-sm text-white/80 mb-2">YOUR POINTS</p>
                  <div className="text-5xl font-bold mb-4">{stats.currentPoints.toLocaleString()}</div>

                  {nextTier && (
                    <>
                      <p className="text-sm text-white/80 mb-2">TO NEXT TIER: {pointsToNext.toLocaleString()} points</p>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div
                          className="bg-white rounded-full h-2 transition-all duration-300"
                          style={{ width: `${progressPercent}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-white/70 mt-2">{nextTier.name}</p>
                    </>
                  )}
                </div>

                <Button className="w-full bg-white text-foreground hover:bg-white/90 font-bold">
                  Redeem Points
                </Button>
              </div>

              {/* Right - Benefits */}
              <div>
                <h3 className="font-bold text-lg mb-4">Your Current Benefits</h3>
                <ul className="space-y-3">
                  {currentTier?.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-lg">✓</span>
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>

                {nextTier && (
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <p className="text-sm text-white/80 mb-3">Next Tier Benefits:</p>
                    <ul className="space-y-2">
                      {nextTier.benefits.slice(0, 2).map((benefit, idx) => (
                        <li key={idx} className="text-sm text-white/70 flex items-start gap-2">
                          <span>→</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Gift className="h-4 w-4" />
                Total Earned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.totalPointsEarned.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-2">All-time points</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Redeemed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">{stats.totalPointsRedeemed.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-2">Points used</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Avg Per Order
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {Math.round(stats.totalPointsEarned / stats.orders.length).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-2">Points per purchase</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Award className="h-4 w-4" />
                Discount Earned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{currentTier?.discount}%</div>
              <p className="text-xs text-muted-foreground mt-2">Current tier discount</p>
            </CardContent>
          </Card>
        </div>

        {/* Tiers Progression */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Membership Tiers</CardTitle>
            <CardDescription>Progress through tiers to unlock exclusive benefits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {tiers.map((tier) => {
                const isCurrentTier = tier.id === stats.currentTier;
                const isPastTier = tiers.findIndex((t) => t.id === stats.currentTier) > tiers.findIndex((t) => t.id === tier.id);

                return (
                  <div
                    key={tier.id}
                    className={`p-5 rounded-lg border-2 transition-all ${
                      isCurrentTier
                        ? `border-foreground bg-gradient-to-br ${tier.color} text-white`
                        : isPastTier
                          ? "border-border bg-muted/50"
                          : "border-border hover:border-primary/50"
                    }`}
                  >
                    <h3 className={`font-bold mb-1 ${isCurrentTier ? "text-white" : ""}`}>{tier.name}</h3>
                    <p className={`text-sm mb-3 ${isCurrentTier ? "text-white/80" : "text-muted-foreground"}`}>
                      {tier.minPoints.toLocaleString()} points
                    </p>
                    {isCurrentTier && (
                      <Badge className="bg-white text-foreground border-0 mb-3">Current Tier</Badge>
                    )}
                    <ul className={`text-xs space-y-1 ${isCurrentTier ? "text-white/90" : "text-muted-foreground"}`}>
                      {tier.benefits.slice(0, 2).map((benefit, idx) => (
                        <li key={idx}>• {benefit}</li>
                      ))}
                      {tier.benefits.length > 2 && (
                        <li className={isCurrentTier ? "text-white/70" : ""}>
                          + {tier.benefits.length - 2} more benefits
                        </li>
                      )}
                    </ul>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card className="mb-12 bg-secondary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              How Points Work
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-2xl font-bold text-primary mb-2">1 Point</div>
                <p className="text-sm text-muted-foreground">Per ₱10 spent</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent mb-2">100 Points</div>
                <p className="text-sm text-muted-foreground">= ₱100 discount</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600 mb-2">Bonus</div>
                <p className="text-sm text-muted-foreground">Birthday & tier bonuses</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Recent Orders
            </CardTitle>
            <CardDescription>Your purchases and earned points</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.orders.map((order) => (
                <div key={order.id} className="p-4 rounded-lg border border-border hover:bg-muted/30 transition">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-bold text-foreground">Order #{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.orderDate).toLocaleDateString("en-PH")}
                      </p>
                    </div>
                    <Badge className={order.status === "completed" ? "bg-green-100 text-green-800 border-0" : "bg-blue-100 text-blue-800 border-0"}>
                      {order.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-foreground">₱{order.amount.toLocaleString()}</span>
                    <span className="text-green-600 font-bold flex items-center gap-1">
                      <Zap className="h-4 w-4" />
                      +{order.pointsEarned} points
                    </span>
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
