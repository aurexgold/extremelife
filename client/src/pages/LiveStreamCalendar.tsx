import { useState } from "react";
import { Link } from "wouter";
import { useLiveStreams } from "@/context/LiveStreamContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Play, Clock, User } from "lucide-react";

export default function LiveStreamCalendar() {
  const { streams } = useLiveStreams();
  const [currentDate, setCurrentDate] = useState(new Date(2024, 10, 29));

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const monthName = currentDate.toLocaleString("default", { month: "long", year: "numeric" });

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getDateString = (day: number) => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const date = String(day).padStart(2, "0");
    return `${year}-${month}-${date}`;
  };

  const getStreamsForDay = (day: number | null) => {
    if (!day) return [];
    const dateString = getDateString(day);
    return streams.filter((s) => s.date === dateString);
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-serif text-foreground mb-2">Live Stream Calendar</h1>
          <p className="text-muted-foreground">Never miss our live selling events. Mark your calendar!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">{monthName}</h2>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handlePrevMonth}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleNextMonth}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Day headers */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="text-center font-bold text-sm text-muted-foreground py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-2">
                  {calendarDays.map((day, index) => {
                    const streamsOnDay = getStreamsForDay(day);
                    const hasStreams = streamsOnDay.length > 0;
                    const isToday =
                      day &&
                      day === new Date().getDate() &&
                      currentDate.getMonth() === new Date().getMonth() &&
                      currentDate.getFullYear() === new Date().getFullYear();

                    return (
                      <div
                        key={index}
                        className={`aspect-square p-2 rounded-lg border border-border hover:bg-muted transition-colors ${
                          day === null ? "bg-muted/20" : "bg-card hover:shadow-md"
                        } ${isToday ? "border-primary bg-primary/5" : ""} ${
                          hasStreams ? "ring-2 ring-accent" : ""
                        }`}
                      >
                        {day && (
                          <div className="h-full flex flex-col">
                            <span className={`text-sm font-bold mb-1 ${isToday ? "text-primary" : ""}`}>
                              {day}
                            </span>
                            {hasStreams && (
                              <div className="flex-1 flex flex-col gap-1 min-h-0">
                                {streamsOnDay.slice(0, 2).map((stream) => (
                                  <Link key={stream.id} href={`/live-stream/${stream.id}`}>
                                    <a className="text-xs bg-accent/10 text-accent px-1 py-0.5 rounded truncate hover:bg-accent/20">
                                      {stream.title.length > 15
                                        ? stream.title.substring(0, 12) + "..."
                                        : stream.title}
                                    </a>
                                  </Link>
                                ))}
                                {streamsOnDay.length > 2 && (
                                  <span className="text-xs text-muted-foreground">
                                    +{streamsOnDay.length - 2} more
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="mt-6 pt-6 border-t space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-accent rounded"></div>
                    <span>Has live stream</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary rounded"></div>
                    <span>Today</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Streams Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5 text-red-500" />
                  Upcoming Streams
                </CardTitle>
                <CardDescription>Schedule for the next 2 weeks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {streams
                  .filter((s) => s.status === "scheduled")
                  .sort((a, b) => new Date(a.date + " " + a.time).getTime() - new Date(b.date + " " + b.time).getTime())
                  .slice(0, 6)
                  .map((stream) => (
                    <Link key={stream.id} href={`/live-stream/${stream.id}`}>
                      <a className="block p-3 rounded-lg border border-border hover:bg-muted/50 transition group">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="font-bold text-sm group-hover:text-primary transition line-clamp-2">
                            {stream.title}
                          </h4>
                          <Badge className="text-xs flex-shrink-0 bg-accent/10 text-accent border-0">
                            {stream.category}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            📅 {new Date(stream.date).toLocaleDateString("en-PH")}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {stream.time}
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" /> {stream.host}
                          </div>
                        </div>
                      </a>
                    </Link>
                  ))}
              </CardContent>
            </Card>

            {/* Add Reminder Card */}
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6 text-center">
                <h3 className="font-bold mb-2">Never Miss a Stream</h3>
                <p className="text-sm text-primary-foreground/80 mb-4">
                  Subscribe to get notifications about upcoming live events
                </p>
                <Button className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  Subscribe to Alerts
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
