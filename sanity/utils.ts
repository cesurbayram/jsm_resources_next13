import qs from 'query-string';

interface BuildQueryParams {
  type: string;
  query: string;
  category: string;
  page: number;
  perPage?: number;
}

export function buildQuery(params: BuildQueryParams) {
  const { type, query, category, page = 1, perPage = 10 } = params;

  const conditions = [`*[_type == "${type}"]`];

  if (query) {
    conditions.push(`title match "*${query}*"`);
  }
  if (category && category !== 'all') {
    conditions.push(`category == "${category}"`);
  }

  const offset = (page - 1) * perPage;
  const limit = perPage;

  if (conditions.length > 1) {
    return `${conditions[0]} && (${conditions.slice(1).join(' && ')})[${offset}...${offset + limit}]`;
  } else {
    return `${conditions[0]}[${offset}...${offset + limit}]`;
  }
}

interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
  keysToRemove?: string[];
}

export function formUrlQuery({ params, key, value, keysToRemove }: UrlQueryParams) {
  const currentURl = qs.parse(params);

  if (keysToRemove) {
    keysToRemove.forEach((keyToRemove) => {
      delete currentURl[keyToRemove];
    });
  } else if (key && value !== null) {
    currentURl[key] = value;
  }

  const url = qs.stringifyUrl({
    url: window.location.pathname,
    query: currentURl
  }, {
    skipNull: true
  });

  console.log(currentURl, key, value);
  return url;
}
