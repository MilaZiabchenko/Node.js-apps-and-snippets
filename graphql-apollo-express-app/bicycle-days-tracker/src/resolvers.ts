import { bicycleMonthsAndDays } from './_db.js';

let allBicycleMonthsAndDays = bicycleMonthsAndDays;

const resolvers = {
  Query: {
    bicycleMonthsAndDaysInfo: () => allBicycleMonthsAndDays,
    bicycleMonthInfo: (_, { month }) =>
      allBicycleMonthsAndDays.find(m => m.month === month),
    busiestBicycleMonths: () =>
      allBicycleMonthsAndDays.reduce(
        (acc: typeof allBicycleMonthsAndDays, cur, _, self) => {
          const allBicycleDays = self.map(cur => cur.bicycleDays);

          if (cur.bicycleDays === Math.max(...allBicycleDays)) {
            acc.push(cur);
          }

          return acc;
        },
        []
      ),
    annualBicycleDays: () =>
      allBicycleMonthsAndDays.reduce((acc, cur) => acc + cur.bicycleDays, 0)
  },

  Mutation: {
    deleteMonth: (_, { month }) => {
      const monthToDelete = { month };

      allBicycleMonthsAndDays = allBicycleMonthsAndDays.filter(
        existingMonth => existingMonth.month !== monthToDelete.month
      );

      return { ...monthToDelete, deleted: true };
    },

    addMonth: (_, { month, bicycleDays }) => {
      const newMonth = { month, bicycleDays };

      if (
        allBicycleMonthsAndDays.some(
          monthInfo => monthInfo.month === newMonth.month
        )
      ) {
        return null;
      } else {
        allBicycleMonthsAndDays.push(newMonth);

        return newMonth;
      }
    },

    updateNumberOfDays: (_, { month, bicycleDays }) => {
      const updatedMonth = { month, bicycleDays };

      allBicycleMonthsAndDays = allBicycleMonthsAndDays.map(existingMonth =>
        existingMonth.month === updatedMonth.month
          ? updatedMonth
          : existingMonth
      );

      return updatedMonth;
    }
  }
};

export { resolvers };
