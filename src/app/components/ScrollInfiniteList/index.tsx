/* eslint-disable react/jsx-fragments */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CardActions, Chip } from "@mui/material"
import React from "react"

const ScrollInfiniteList: React.FC<{ isShowScroll: boolean, updateScroll: () => void, children }> =
    function ({ isShowScroll, updateScroll, children }) {

        const scrollObserve = React.useRef() as React.MutableRefObject<HTMLInputElement>
        const [scrollRadio, setScrollRadio] = React.useState<any>(null)

        const intersectionObserver = new IntersectionObserver((entries) => {
            const radio = entries[0].intersectionRatio
            setScrollRadio(radio)
        })

        React.useEffect(() => {
            intersectionObserver.observe(scrollObserve.current)
            return () => {
                intersectionObserver.disconnect()
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])

        React.useEffect(() => {
            if (scrollRadio > 0) {
                updateScroll()
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [scrollRadio])

        return (
            <React.Fragment>
                {children}
                <CardActions>
                    {(isShowScroll && false) && <Chip style={{ width: '25%' }} label="CARREGANDO ITEMS..."
                        color="info" />}
                    <div ref={scrollObserve} />
                </CardActions>
            </React.Fragment>
        )
    }

export default ScrollInfiniteList