import type {
  AddressUser,
  HairColors,
  TransformedData,
  User,
} from '@/types/user';

/**
 * Transform user data grouped by department with optimized performance
 *
 * @param users Array of user objects from DummyJSON API
 * @returns Transformed data grouped by department
 */
export function transformUsersByDepartment(users: User[]): TransformedData {
  if (!users || users.length === 0) {
    return {};
  }

  // Use Map for better performance during aggregation
  const departmentMap = new Map<
    string,
    {
      males: number;
      females: number;
      ages: number[];
      hairColors: Map<string, number>;
      addresses: Map<string, string>;
    }
  >();

  // Single pass through users - O(n) complexity
  for (const user of users) {
    const department = user.company?.department;

    // Skip users without department
    if (!department) {
      continue;
    }

    // Initialize department data if not exists
    if (!departmentMap.has(department)) {
      departmentMap.set(department, {
        males: 0,
        females: 0,
        ages: [],
        hairColors: new Map(),
        addresses: new Map(),
      });
    }

    const deptData = departmentMap.get(department)!;

    // Count gender
    if (user.gender === 'male') {
      deptData.males++;
    } else if (user.gender === 'female') {
      deptData.females++;
    }

    // Collect age for range calculation
    if (typeof user.age === 'number' && !isNaN(user.age)) {
      deptData.ages.push(user.age);
    }

    // Count hair colors
    const hairColor = user.hair?.color;
    if (hairColor) {
      deptData.hairColors.set(
        hairColor,
        (deptData.hairColors.get(hairColor) || 0) + 1,
      );
    }

    // Collect user address with full name as key
    const firstName = user.firstName || '';
    const lastName = user.lastName || '';
    const postalCode = user.address?.postalCode;

    if (firstName && lastName && postalCode) {
      const fullName = `${firstName}${lastName}`;
      deptData.addresses.set(fullName, postalCode);
    }
  }

  // Transform Map data to final structure
  const result: TransformedData = {};

  for (const [department, data] of departmentMap) {
    // Calculate age range
    let ageRange = '0-0';
    if (data.ages.length > 0) {
      const sortedAges = data.ages.sort((a, b) => a - b);
      const minAge = sortedAges[0];
      const maxAge = sortedAges[sortedAges.length - 1];
      ageRange = `${minAge}-${maxAge}`;
    }

    // Convert hair colors Map to object
    const hairObj: HairColors = {};
    for (const [color, count] of data.hairColors) {
      hairObj[color] = count;
    }

    // Convert addresses Map to object
    const addressObj: AddressUser = {};
    for (const [name, postalCode] of data.addresses) {
      addressObj[name] = postalCode;
    }

    result[department] = {
      male: data.males,
      female: data.females,
      ageRange,
      hair: hairObj,
      addressUser: addressObj,
    };
  }

  return result;
}

/**
 * Get summary statistics for transformed data
 *
 * @param data Transformed user data
 * @returns Summary statistics
 */
export function getDataSummary(data: TransformedData) {
  const departments = Object.keys(data);
  const totalDepartments = departments.length;

  let totalUsers = 0;
  let totalMales = 0;
  let totalFemales = 0;
  const allHairColors = new Set<string>();

  for (const dept of departments) {
    const deptData = data[dept];
    totalUsers += deptData.male + deptData.female;
    totalMales += deptData.male;
    totalFemales += deptData.female;

    Object.keys(deptData.hair).forEach((color) => allHairColors.add(color));
  }

  return {
    totalDepartments,
    totalUsers,
    totalMales,
    totalFemales,
    uniqueHairColors: allHairColors.size,
    departments: departments.sort(),
  };
}
