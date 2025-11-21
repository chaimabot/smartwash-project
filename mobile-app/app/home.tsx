import React, { useState } from "react";

// Type definitions
type MachineStatus = "available" | "occupied" | "maintenance";
type ThemeMode = "light" | "dark";

interface Machine {
  id: string;
  name: string;
  status: MachineStatus;
  icon: string;
}

interface ChipFilter {
  id: string;
  label: string;
  active: boolean;
}

// Main App Component
export default function HomeScreen() {
  // Removed unused variable
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [activeFilter, setActiveFilter] = useState<string>("all");

  // Sample machine data
  const machines: Machine[] = [
    {
      id: "1",
      name: "Machine 01",
      status: "available",
      icon: "laundry",
    },
    // Add more machines as needed
  ];

  // Filter chips configuration
  const filterChips: ChipFilter[] = [
    { id: "all", label: "Toutes", active: activeFilter === "all" },
    {
      id: "available",
      label: "Disponible",
      active: activeFilter === "available",
    },
    { id: "occupied", label: "Occupée", active: activeFilter === "occupied" },
  ];

  // Toggle theme function
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Handle filter change
  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
  };

  // Get status styles
  const getStatusStyles = (status: MachineStatus) => {
    const base = "flex items-center gap-1.5 mt-1";
    const statusMap = {
      available: {
        dot: "bg-status-green",
        text: "text-status-green",
        label: "Disponible",
      },
      occupied: {
        dot: "bg-status-orange",
        text: "text-status-orange",
        label: "Occupée",
      },
      maintenance: {
        dot: "bg-red-500",
        text: "text-red-500",
        label: "Maintenance",
      },
    };
    return { ...statusMap[status], base };
  };

  return (
    <div className={`font-display ${theme === "dark" ? "dark" : ""}`}>
      {/* Tailwind config would normally be in a separate file */}
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined");

        :root {
          --primary: #3c3cf6;
          --background-light: #f5f5f8;
          --background-dark: #101022;
          --accent-blue: #4a90e2;
          --accent-turquoise: #50e3c2;
          --status-green: #2ecc71;
          --status-orange: #f39c12;
          --text-dark-gray: #333333;
          --text-light-gray: #888888;
        }

        .glassmorphism {
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .dark .glassmorphism {
          background: rgba(26, 26, 46, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .material-symbols-outlined {
          font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
        }

        body {
          min-height: max(884px, 100dvh);
        }
      `}</style>

      <div className="relative flex min-h-screen w-full flex-col bg-gradient-to-b from-background-light to-white dark:from-background-dark dark:to-[#1a1a33] group/design-root overflow-x-hidden">
        {/* Top App Bar */}
        <div className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
          <div className="flex items-center p-4 pb-2 justify-between">
            <div className="flex size-12 shrink-0 items-center justify-center">
              <span className="material-symbols-outlined text-text-dark-gray dark:text-white text-3xl">
                local_laundry_service
              </span>
            </div>
            <h2 className="text-text-dark-gray dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1">
              Bonjour Chaima 👋
            </h2>
            <div className="flex w-12 items-center justify-end">
              <button
                className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 bg-transparent text-text-dark-gray dark:text-white gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0"
                onClick={toggleTheme}
              >
                <span className="material-symbols-outlined text-2xl">
                  {theme === "dark" ? "light_mode" : "dark_mode"}
                </span>
              </button>
              <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 bg-transparent text-text-dark-gray dark:text-white gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0">
                <span className="material-symbols-outlined text-2xl">
                  notifications
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="p-4">
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
            {filterChips.map((chip) => (
              <div
                key={chip.id}
                className={`flex h-10 shrink-0 cursor-pointer items-center justify-center gap-x-2 rounded-full pl-5 pr-5 shadow-sm ${
                  chip.active ? "bg-accent-blue" : "bg-white dark:bg-slate-700"
                }`}
                onClick={() => handleFilterChange(chip.id)}
              >
                <p
                  className={`${
                    chip.active
                      ? "text-white"
                      : "text-text-dark-gray dark:text-white"
                  } text-sm font-medium leading-normal`}
                >
                  {chip.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section Header */}
        <h3 className="text-text-dark-gray dark:text-white text-xl font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-2">
          État des Machines
        </h3>

        {/* List of Machines */}
        <div className="flex flex-col gap-4 px-4 pb-28">
          {machines
            .filter(
              (machine) =>
                activeFilter === "all" || machine.status === activeFilter
            )
            .map((machine) => {
              const statusStyles = getStatusStyles(machine.status);
              const isAvailable = machine.status === "available";

              return (
                <div
                  key={machine.id}
                  className="flex flex-col gap-4 rounded-xl glassmorphism p-4 shadow-lg shadow-slate-200/50 dark:shadow-none"
                >
                  <div className="flex items-center gap-4 justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`text-accent-blue flex items-center justify-center rounded-lg ${
                          isAvailable
                            ? "bg-accent-blue/20"
                            : "bg-status-orange/20"
                        } shrink-0 size-12`}
                      >
                        <span className="material-symbols-outlined text-2xl">
                          {machine.icon}
                        </span>
                      </div>
                      <div className="flex flex-col justify-center">
                        <p className="text-text-dark-gray dark:text-white text-base font-bold leading-normal">
                          {machine.name}
                        </p>
                        <div className={statusStyles.base}>
                          <div
                            className={`size-2 rounded-full ${statusStyles.dot}`}
                          ></div>
                          <p
                            className={`${statusStyles.text} text-sm font-medium leading-normal`}
                          >
                            {statusStyles.label}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <span className="material-symbols-outlined text-text-light-gray text-2xl">
                        arrow_forward_ios
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
