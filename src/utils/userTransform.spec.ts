import { transformUsersByDepartment, getDataSummary } from '@/utils/userTransform';
import type { User } from '@/types/user';

// Mock data for testing
const mockUsers: User[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    gender: 'male',
    hair: { color: 'Brown' },
    address: { postalCode: '12345' },
    company: { department: 'Engineering' },
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    age: 25,
    gender: 'female',
    hair: { color: 'Blond' },
    address: { postalCode: '67890' },
    company: { department: 'Engineering' },
  },
  {
    id: 3,
    firstName: 'Bob',
    lastName: 'Johnson',
    age: 35,
    gender: 'male',
    hair: { color: 'Black' },
    address: { postalCode: '11111' },
    company: { department: 'Marketing' },
  },
  {
    id: 4,
    firstName: 'Alice',
    lastName: 'Wilson',
    age: 28,
    gender: 'female',
    hair: { color: 'Brown' },
    address: { postalCode: '22222' },
    company: { department: 'Marketing' },
  },
  {
    id: 5,
    firstName: 'Charlie',
    lastName: 'Brown',
    age: 40,
    gender: 'male',
    hair: { color: 'Brown' },
    address: { postalCode: '33333' },
    company: { department: 'Engineering' },
  },
];

describe('User Data Transformation', () => {
  describe('transformUsersByDepartment', () => {
    it('should transform users correctly by department', () => {
      const result = transformUsersByDepartment(mockUsers);
      
      expect(result).toHaveProperty('Engineering');
      expect(result).toHaveProperty('Marketing');
      
      // Test Engineering department
      const engineering = result.Engineering;
      expect(engineering.male).toBe(2); // John and Charlie
      expect(engineering.female).toBe(1); // Jane
      expect(engineering.ageRange).toBe('25-40');
      expect(engineering.hair).toEqual({
        'Brown': 2, // John and Charlie
        'Blond': 1, // Jane
      });
      expect(engineering.addressUser).toEqual({
        'JohnDoe': '12345',
        'JaneSmith': '67890',
        'CharlieBrown': '33333',
      });
      
      // Test Marketing department
      const marketing = result.Marketing;
      expect(marketing.male).toBe(1); // Bob
      expect(marketing.female).toBe(1); // Alice
      expect(marketing.ageRange).toBe('28-35');
      expect(marketing.hair).toEqual({
        'Black': 1, // Bob
        'Brown': 1, // Alice
      });
      expect(marketing.addressUser).toEqual({
        'BobJohnson': '11111',
        'AliceWilson': '22222',
      });
    });

    it('should handle empty user array', () => {
      const result = transformUsersByDepartment([]);
      expect(result).toEqual({});
    });

    it('should handle users with missing data gracefully', () => {
      const incompleteUsers: Partial<User>[] = [
        {
          id: 1,
          firstName: 'John',
          // missing lastName
          age: 30,
          gender: 'male',
          hair: { color: 'Brown' },
          company: { department: 'Engineering' },
        },
        {
          id: 2,
          firstName: 'Jane',
          lastName: 'Smith',
          age: 25,
          gender: 'female',
          // missing hair color
          company: { department: 'Engineering' },
        },
      ];
      
      const result = transformUsersByDepartment(incompleteUsers as User[]);
      
      expect(result.Engineering.male).toBe(1);
      expect(result.Engineering.female).toBe(1);
      expect(Object.keys(result.Engineering.hair)).toContain('Brown');
      expect(Object.keys(result.Engineering.addressUser)).toHaveLength(0); // No complete address data
    });

    it('should calculate age range correctly', () => {
      const usersWithSameAge: User[] = [
        {
          ...mockUsers[0],
          age: 30,
          company: { department: 'TestDept' },
        },
        {
          ...mockUsers[1],
          age: 30,
          company: { department: 'TestDept' },
        },
      ];
      
      const result = transformUsersByDepartment(usersWithSameAge);
      expect(result.TestDept.ageRange).toBe('30-30');
    });
  });

  describe('getDataSummary', () => {
    it('should generate correct summary statistics', () => {
      const transformedData = transformUsersByDepartment(mockUsers);
      const summary = getDataSummary(transformedData);
      
      expect(summary.totalDepartments).toBe(2);
      expect(summary.totalUsers).toBe(5);
      expect(summary.totalMales).toBe(3);
      expect(summary.totalFemales).toBe(2);
      expect(summary.uniqueHairColors).toBe(3); // Brown, Blond, Black
      expect(summary.departments).toEqual(['Engineering', 'Marketing']);
    });

    it('should handle empty data', () => {
      const summary = getDataSummary({});
      
      expect(summary.totalDepartments).toBe(0);
      expect(summary.totalUsers).toBe(0);
      expect(summary.totalMales).toBe(0);
      expect(summary.totalFemales).toBe(0);
      expect(summary.uniqueHairColors).toBe(0);
      expect(summary.departments).toEqual([]);
    });
  });

  describe('Performance Tests', () => {
    it('should handle large datasets efficiently', () => {
      // Generate large dataset
      const largeUserSet: User[] = [];
      const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'];
      const hairColors = ['Brown', 'Blond', 'Black', 'Red', 'Gray'];
      
      for (let i = 0; i < 1000; i++) {
        largeUserSet.push({
          id: i,
          firstName: `User${i}`,
          lastName: `Lastname${i}`,
          age: 20 + (i % 40),
          gender: i % 2 === 0 ? 'male' : 'female',
          hair: { color: hairColors[i % hairColors.length] },
          address: { postalCode: `${10000 + i}` },
          company: { department: departments[i % departments.length] },
        });
      }
      
      const startTime = performance.now();
      const result = transformUsersByDepartment(largeUserSet);
      const endTime = performance.now();
      
      // Should complete within reasonable time (adjust threshold as needed)
      expect(endTime - startTime).toBeLessThan(100); // 100ms
      
      // Verify correctness
      expect(Object.keys(result)).toHaveLength(5);
      expect(Object.values(result).reduce((sum, dept) => sum + dept.male + dept.female, 0)).toBe(1000);
    });
  });
});
