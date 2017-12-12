import React from 'react';
import { Flex, Text, Image } from '../components'

export function BaseComp() {
    return (
        <Flex>
            <Text label='sdafsdf' color='#0000ff'/>
            <Image src={require('../assets/120.png')}/>
        </Flex>
    );
}