import { create } from "zustand";

export const useDashboardStore = create((set) => ({
  temperature: [20.1, 19.5, 22, 34, 30, 29.4, 28.7],
  humidity: [20, 22, 18, 35, 42, 68, 55],
  resources: {
    food: { current: 500, max: 3000 },
    water: { current: 1500, max: 3000 },
  },
  schedules: [
    { mealName: "Breakfast", time: "10:00 AM", status: "Completed" },
    { mealName: "Lunch", time: "01:00 PM", status: "Upcoming" },
    { mealName: "Dinner", time: "07:00 PM", status: "Upcoming" },
  ],
  setSensor: ({ temperature, humidity }) =>
    set((state) => ({
      temperature: temperature ? [...state.temperature.slice(1), temperature] : state.temperature,
      humidity: humidity ? [...state.humidity.slice(1), humidity] : state.humidity,
    })),
  setResources: (resources) => set({ resources }),
  setSchedules: (schedules) => set({ schedules }),
}));
