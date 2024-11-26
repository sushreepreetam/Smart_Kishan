import React from 'react';
import { Navbar } from './Navbar';
import { ExploreCategory } from './exploreCategory';
import StickyFooter from './StickyFooter';

export function Category(){

    return(
        <div>
            <Navbar/>
            <ExploreCategory/>
            <StickyFooter/>
        </div>
    )
}