jest.mock('@/lib/prisma', () => ({
  __esModule: true,
  default: {
    note: {
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));
