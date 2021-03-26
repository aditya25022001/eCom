import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export const Paginate = ({ pages, page, isAdmin=false, keyWord='', view='home' }) => {
    
    return pages > 1 && (
        <Pagination>
            {[...Array(pages).keys()].map(x => (
                <LinkContainer key={x+1} to={(isAdmin && view=='products') ? `/admin/products/page/${x+1}` :
                                             (isAdmin && view=='orders') ? `/admin/orders/page/${x+1}` :
                                             (isAdmin && view=='users') ? `/admin/users/page/${x+1}` :
                        keyWord ? `/search/${keyWord}/page/${x+1}` : `/page/${x+1}`
                    }>
                    <Pagination.Item active={x+1==page}>{x+1}</Pagination.Item>
                </LinkContainer>
            ))}
        </Pagination>
    )
}
