import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


interface Help {
    name: any
    item: any
}
export default function ItemList({item}:Help) {
    return(
        <View>
            <Text>{item.nome}</Text>
        </View>
    );

}