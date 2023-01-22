interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description: 'Pending: Finish project development by next month',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      description: 'Finished: Finish Backend in two weeks',
      status: 'finished',
      createdAt: Date.now() - 100000,
    },
    {
      description: 'In-Progress: Finish Frontend in three weeks',
      status: 'in-progress',
      createdAt: Date.now() - 10000,
    },
  ],
};
