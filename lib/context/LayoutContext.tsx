"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import getResourcePageVisibility from "@/firebase/db/resources/getResourcePageVisibility";
import getHackathonPageData from "@/firebase/db/resources/getHackathonPageData";
import getSchedule from "@/firebase/db/resources/getSchedule";
import {
  HackathonPageData,
  EventScheduleItem,
} from "@/app/account/dashboard/page";

export const LayoutContext = createContext({});

export const useLayoutContext = () => useContext(LayoutContext);

interface LayoutContextProviderProps {
  children: ReactNode;
}

export function LayoutContextProvider({
  children,
}: LayoutContextProviderProps): JSX.Element {
  const [title, setTitle] = useState("Home");
  const [hackathonPageViewable, setHackathonPageViewable] = useState(false);
  const [hackathonPageData, setHackathonPageData] = useState<
    HackathonPageData | undefined
  >(undefined);
  const [schedule, setSchedule] = useState<EventScheduleItem[]>([]);

  useEffect(() => {
    getResourcePageVisibility().then((result: boolean) => {
      setHackathonPageViewable(result);
    });
  }, []);

  const fetchHackathonPageData = async () => {
    if (hackathonPageData !== undefined) {
      return hackathonPageData;
    } else {
      const result = await getHackathonPageData();
      let data: HackathonPageData = JSON.parse(result);
      setHackathonPageData(data);
      return data;
    }
  };

  const fetchSchedule = async () => {
    if (schedule.length > 0) {
      return schedule;
    } else {
      const fetchedSchedule = await getSchedule();
      let real: EventScheduleItem[] = JSON.parse(fetchedSchedule);
      setSchedule(real);
      return real;
    }
  };

  return (
    <LayoutContext.Provider
      value={{
        title,
        updateTitle: (newTitle: string) => {
          setTitle(newTitle);
        },
        hackathonPageViewable,
        updateHackathonPageViewable: (value: boolean) => {
          setHackathonPageViewable(value);
        },
        hackathonPageData,
        setHackathonPageData: (value: HackathonPageData) => {
          setHackathonPageData(value);
        },
        fetchHackathonPageData,
        schedule,
        updateHackathonSchedule: (value: EventScheduleItem[]) => {
          setSchedule(value);
        },
        fetchSchedule,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}
