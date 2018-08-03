import React from 'react'

//exportamos de forma nombrada con Title
//en js class está protegida se recomienda usar className
export const Cabecera = ({children}) => (
<h1 className="title">{children}</h1>
)
