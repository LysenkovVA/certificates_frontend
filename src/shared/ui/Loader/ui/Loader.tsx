import "./Loader.scss";

interface LoaderProps {
    className?: string;
}

/**
 *@deprecated
 */
export const Loader = ({ className }: LoaderProps) => {
    return (
        <div className="lds-ripple">
            <div></div>
            <div></div>
        </div>
    );
};
