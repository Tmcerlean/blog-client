import { useEffect } from 'react';

const NotFound = () => {

    useEffect(() => {
        document.title = 'Not Found';
    }, []);

    return (
        <div>
            <div className="">
                <p className="">
                    Not Found!
                </p>
            </div>
        </div>
    )
}

export default NotFound;