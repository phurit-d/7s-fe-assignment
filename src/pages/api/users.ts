import type { DummyJsonResponse, TransformedData } from '@/types';
import { transformUsersByDepartment } from '@/utils';
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = TransformedData | { error: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
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
    const transformedData = transformUsersByDepartment(data.users);

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
