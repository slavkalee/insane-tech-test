import { ref } from '@vue/reactivity';

export function useSearch() {
  const searchValue = ref('');

  const setSearchValue = (str: string) => {
    searchValue.value = str;
  };

  return {
    searchValue,
    setSearchValue,
  };
}
