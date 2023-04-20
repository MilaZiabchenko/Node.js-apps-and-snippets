const typeDefs = `#graphql
  enum Month {
    APR
    MAY
    JUN
    JUL
    AUG
    SEP
    OCT
  }

  type BicycleMonth {
    month: Month!
    bicycleDays: Int!
  }

  type Query {
    bicycleMonthsAndDaysInfo: [BicycleMonth!]!
    bicycleMonthInfo(month: Month!): BicycleMonth
    busiestBicycleMonths: [BicycleMonth!]!
    annualBicycleDays: Int!
  }

  type DeletedBicycleMonth {
    month: Month!
    deleted: Boolean!
  }

  type Mutation {
    deleteMonth(month: Month!): DeletedBicycleMonth!
    addMonth(month: Month!, bicycleDays: Int!): BicycleMonth!
    updateNumberOfDays(month: Month!, bicycleDays: Int!): BicycleMonth
  }
`;

export { typeDefs };
