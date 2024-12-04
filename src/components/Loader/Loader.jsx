import style from "./Loader.module.css"
export function Loader(){
    return(
        <div className={style.LoaderWrapper}>
            <div class={style.loader}/>
        </div>
    )
}