import React from "react"
import {View , Text, ScrollView,FlatList, TouchableOpacity, } from 'react-native'
import styles from "./style"
import QuotationItem from "./QuotationItem";



export default function QuotationList(props){

    const daysQuery = props.daysQuery

    return(
        <>
            <View style={styles.filters}>
                <TouchableOpacity style={styles.buttonQuery} onPress={()=> props.daysQuery(7) }>
                    <Text style={styles.textButtonQuery}>
                        7D
                    </Text>

                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonQuery} onPress={()=>props.daysQuery(15) }>
                    <Text style={styles.textButtonQuery}>
                        15D
                    </Text>

                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonQuery} onPress={()=>props.daysQuery(30) }>
                    <Text style={styles.textButtonQuery}>
                        30D
                    </Text>

                </TouchableOpacity>


                <TouchableOpacity style={styles.buttonQuery} onPress={()=>props.daysQuery(60) }>
                    <Text style={styles.textButtonQuery}>
                        3M
                    </Text>

                </TouchableOpacity>


                <TouchableOpacity style={styles.buttonQuery} onPress={()=>props.daysQuery(180) }>
                    <Text style={styles.textButtonQuery}>
                        6M
                    </Text>

                </TouchableOpacity>

            </View>
            {/* <ScrollView> */}

                <FlatList 
                data={props.listTransactions}
                renderItem={({item})=>{
                    return <QuotationItem valor={item.valor} data={item.data}/>
                }}  
                keyExtractor={(item, index) => index.toString()}    
                />

               
            {/* </ScrollView> */}
        </>
    );
 
}