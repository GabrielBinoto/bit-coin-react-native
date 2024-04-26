import React from "react"
import {View , Text, Image,  } from 'react-native'
import styles from "./style"


export default function QuotationItem(props){
    return(

        <View style={styles.mainContent}>
            <View style={styles.contextLeft}>

                <View style={styles.boxLogo}>
                    <Image style={styles.logoBitCoin} source={require("../../../img/bitcoin2.png")}/>
                    <Text style={styles.dayContation}>{props.data}</Text>
                </View>
               
            </View>

            <View style={styles.contextRigth}>
                <Text style={styles.price}>{props.valor}</Text>
            </View>

        </View>
    );
}