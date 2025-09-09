const Spinner = ({marginTopClass= "mt-8"}) => {
    return <>
        <div class={`flex items-center justify-center ${marginTopClass}`}>
            <div class="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
        </div>
    </>
}

export default Spinner;