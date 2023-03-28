import { ref, computed } from "vue";

export const collapsed = ref(false);
export const toggleSideBar = () => {
  collapsed.value = !collapsed.value;
};

export const SIDEBAR_WIDTH = 260;
export const SIDEBAR_WIDTH_COLLAPSED = 60;
export const sideBarWidth = computed(
  () => `${collapsed.value ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH}px`
);
