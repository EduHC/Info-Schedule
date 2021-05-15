import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


interface Help {
    name: any
}
export default function FunctionComponent(props:Help) {
    return(
        <View>
            <Text>Nome {props.name}</Text>
        </View>
    );

}