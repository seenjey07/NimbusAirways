module ApplicationHelper
  def flight_duration(departure_time, arrival_time)
    duration_in_seconds = (arrival_time - departure_time).to_i
    hours = duration_in_seconds / 3600
    minutes = (duration_in_seconds % 3600) / 60

    "#{hours}h #{format('%02d', minutes)}m"
  end
end
