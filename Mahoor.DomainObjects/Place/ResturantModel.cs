using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.AccessControl;
using System.Text;

namespace Mahoor.DomainObjects.Place
{

    public class RestaurantModel : BasePlaceModel
    {


        public bool Breakfast { get; set; }
        public bool Lunch { get; set; }
        public bool Dinner { get; set; }
        


        [Column(TypeName = "jsonb")]
        public ScheduleModel Saturday { get; set; }
        [Column(TypeName = "jsonb")]
        public ScheduleModel Sunday { get; set; }
        [Column(TypeName = "jsonb")]
        public ScheduleModel Monday { get; set; }
        [Column(TypeName = "jsonb")]
        public ScheduleModel Tuesday { get; set; }
        [Column(TypeName = "jsonb")]
        public ScheduleModel Wednesday { get; set; }
        [Column(TypeName = "jsonb")]
        public ScheduleModel Thursday { get; set; }
        [Column(TypeName = "jsonb")]
        public ScheduleModel Friday { get; set; }

        public bool IsOpenNow
        {
            get
            {
                var weekDay = DateTime.Now.DayOfWeek;
                switch (weekDay)
                {
                    case DayOfWeek.Sunday:

                        return this.Sunday != null && this.Sunday.IsInRange(DateTime.Now.TimeOfDay);

                        
                    case DayOfWeek.Monday:
                        return this.Monday !=null && this.Monday.IsInRange(DateTime.Now.TimeOfDay);
                    case DayOfWeek.Tuesday:
                        return this.Tuesday != null && this.Tuesday.IsInRange(DateTime.Now.TimeOfDay);
                    case DayOfWeek.Wednesday:
                        return this.Wednesday != null && this.Wednesday.IsInRange(DateTime.Now.TimeOfDay);
                    case DayOfWeek.Thursday:
                        return this.Thursday != null && this.Thursday.IsInRange(DateTime.Now.TimeOfDay);
                    case DayOfWeek.Friday:
                        return this.Friday != null && this.Friday.IsInRange(DateTime.Now.TimeOfDay);
                    case DayOfWeek.Saturday:
                        return this.Saturday != null && this.Saturday.IsInRange(DateTime.Now.TimeOfDay);
                    default:
                        throw new ArgumentOutOfRangeException();
                }

            }
        }
    }

    public class ScheduleModel
    {
        public string Mornings { get; set; }
        public string Evenings { get; set; }

        public bool IsInRange(TimeSpan time)
        {
            var startTimeMorning = TimeSpan.Parse(Mornings.Split("-")[0]);
            var endTimeMorning = TimeSpan.Parse(Mornings.Split("-")[1]);
            var startTimeEvenings = TimeSpan.Parse(Evenings.Split("-")[0]);
            var endTimeEvenings = TimeSpan.Parse(Evenings.Split("-")[1]);

            return (time > startTimeMorning && time < endTimeMorning) ||
                   (time > startTimeEvenings && time < endTimeEvenings);
        }
    }
}
