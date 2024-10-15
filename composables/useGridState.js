const isExpanded = ref(false);

export function useGridState() {
  const expandGrid = (expand) => {
    isExpanded.value = expand;
  };

  return {
    isExpanded,
    expandGrid,
  };
}