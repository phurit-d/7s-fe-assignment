import type {
  AddressUser,
  DummyJsonResponse,
  HairColors,
  TransformedData,
  User,
} from '@/types';
import type { NextApiRequest, NextApiResponse } from 'next';

// Performance optimized data transformation
function transformUserData(users: User[]): TransformedData {
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

  // Single pass through users for optimal performance
  for (const user of users) {
    const department = user.company.department;

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
    } else {
      deptData.females++;
    }

    // Collect age
    deptData.ages.push(user.age);

    // Count hair colors
    const hairColor = user.hair.color;
    deptData.hairColors.set(
      hairColor,
      (deptData.hairColors.get(hairColor) || 0) + 1,
    );

    // Collect address
    const fullName = `${user.firstName}${user.lastName}`;
    deptData.addresses.set(fullName, user.address.postalCode);
  }

  // Transform Map data to final structure
  const result: TransformedData = {};

  for (const [department, data] of departmentMap) {
    const ages = data.ages.sort((a, b) => a - b);
    const minAge = ages[0];
    const maxAge = ages[ages.length - 1];

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
      ageRange: `${minAge}-${maxAge}`,
      hair: hairObj,
      addressUser: addressObj,
    };
  }

  return result;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TransformedData | { error: string }>,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Performance: Set a reasonable limit to avoid large payloads
    const limit = parseInt(req.query.limit as string) || 100;
    const skip = parseInt(req.query.skip as string) || 0;

    const response = await fetch(
      `https://dummyjson.com/users?limit=${limit}&skip=${skip}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: DummyJsonResponse = await response.json();

    // Transform the data
    const transformedData = transformUserData(data.users);

    // Set cache headers for performance
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');

    return res.status(200).json(transformedData);
  } catch (error) {
    console.error('Error fetching/transforming data:', error);
    return res.status(500).json({
      error: 'Failed to fetch and transform user data',
    });
  }
}
