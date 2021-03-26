import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export const Paginate = ({ pages, page, isAdmin=false, keyWord='' }) => {
    
    return pages > 1 && (
        <Pagination>
            {[...Array(pages).keys()].map(x => (
                <LinkContainer key={x+1} to={isAdmin ? `/admin/products/page/${x+1}` : 
                        keyWord ? `/search/${keyWord}/page/${x+1}` : `/page/${x+1}`
                    }>
                    <Pagination.Item active={x+1==page}>{x+1}</Pagination.Item>
                </LinkContainer>
            ))}
        </Pagination>
    )
}
