import Search from './Search';
import { baseUrl, fetchApi } from '../../utils/FetchApi';

async function fetchProperties(searchParams) {
  const purpose = searchParams.purpose || 'for-rent';
  const rentFrequency = searchParams.rentFrequency || 'yearly';
  const minPrice = searchParams.minPrice || '0';
  const maxPrice = searchParams.maxPrice || '1000000';
  const roomsMin = searchParams.roomsMin || '0';
  const bathsMin = searchParams.bathsMin || '0';
  const sort = searchParams.sort || 'price-desc';
  const areaMax = searchParams.areaMax || '35000';
  const locationExternalIDs = searchParams.locationExternalIDs || '5002';
  const categoryExternalID = searchParams.categoryExternalID || '4';

  // Construct the endpoint correctly
  const endpoint = `/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`;
  
  // Fetch data from API
  const response = await fetchApi(endpoint);
  
  return response?.hits || [];
}

export default async function Page({ searchParams }) {
  const properties = await fetchProperties(searchParams);
  return <Search properties={properties} purpose={searchParams.purpose || 'All'} />;
}
