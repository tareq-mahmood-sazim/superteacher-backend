import timezonedDate from "timezoned-date";

export interface MockDateSetup {
  reset(): void;
  set(options: { offset?: number; isoDate?: string }): void;
}

const originalDate = Date;

export function setupMockDate(): MockDateSetup {
  function reset() {
    // eslint-disable-next-line no-global-assign
    Date = originalDate;
  }

  function set({ isoDate, offset }: { offset?: number; isoDate?: string }) {
    const getMockDate = (): typeof import("mockdate") => {
      let MockDate: typeof import("mockdate") | undefined;
      jest.isolateModules(() => {
        MockDate = require("mockdate");
      });

      return MockDate!;
    };

    if (offset !== undefined) {
      // eslint-disable-next-line no-global-assign
      Date = timezonedDate.makeConstructor(offset);
    }

    if (isoDate !== undefined) {
      getMockDate().set(isoDate);
    }
  }

  return { reset, set };
}
