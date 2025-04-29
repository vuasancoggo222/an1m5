import { ref } from "vue";

export default function useDebounce<T extends (...args: any[]) => void>() {
    const timeout = ref<number| undefined>();

    const debounce = (func: T, delay: number) => {
        return (...args: Parameters<T>) => {
            clearTimeout(timeout.value);
            timeout.value = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    return {
        timeout,
        debounce
    };
}