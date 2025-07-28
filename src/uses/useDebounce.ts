import { ref } from "vue";

export default function useDebounce () {
    const timeout = ref<any>(0)
    const debounce = (func:any,timeoutSet:number) => {
        clearTimeout(timeout.value)
        timeout.value = setTimeout(() => {
            func()
        }, timeoutSet);
    }
    return {
        timeout,
        debounce
    }
    
}