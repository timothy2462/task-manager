import styled from "./Loader.module.css"


export const Loader = () => {

    return (
        <div className={styled.loader}>
            <div className={styled.custom_loader}></div>
            <p>Loading...</p>
       </div>
    )
}
