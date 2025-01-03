import React, { useEffect, useState } from 'react'

function HttpCall() {

    const [data, setData] = useState("")

    useEffect(() => {
        fetch("/http-call", {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((responseData) => {
                setData(responseData.data)
                // SVGMetadataElement()
                // find out what the svg is doing
            })
    })

    return (
        // <div>Http Coms</div>
        <h3>{data}</h3>
    )
}

export default HttpCall