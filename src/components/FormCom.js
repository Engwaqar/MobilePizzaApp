import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Form, FormItem } from 'react-native-form-component';

const FormCom = () => {
  return (
    <Form onButtonPress={() => console.warn('do something')}>
     <FormItem
    label="Email"
    isRequired
    value={'email'}
    // onChangeText={(email) => setEmail(email)}
    asterik
    // ref={emailInput}
  />
  </Form>
  )
}

export default FormCom

const styles = StyleSheet.create({})