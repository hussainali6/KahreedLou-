import React from 'react'
const MyImage = ({ imgs = [{ url: "" }] }) => {
    return (
        <>
            {imgs.map((curElem, index) => {
                return (
                    <img
                        src={curElem.url}
                        alt={curElem.filename}
                        key={index}
                        style={{height:'300px',width:"300px"}}
                    />
                )

            })
            }
        </>
    )
}
export default MyImage;
