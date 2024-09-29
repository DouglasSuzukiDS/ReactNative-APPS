import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

export default function App() {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [showIMC, setShowIMC] = useState(false)
  const [imc, setIMC] = useState(0)
  const [message, setMessage] = useState('')

  const handleCalcIMC = () => {
    if(height !== '' && weight !== '') {
      // Math.pow(NUM, expoente) => NUM elavado ao expoente 
      const heightInMeters = Math.pow((parseFloat(height) / 100), 2).toFixed(2)
      const result = parseFloat(weight) / parseFloat(heightInMeters)

      setIMC(result)

      if(result !== 0) {
        if(result <= 18.4) {
          setMessage('Abaixo do peso')
        } else if(result === 18.5 || result <= 24.9){
          setMessage('Peso normal')
        }else if(result === 25 || result <= 29.9) {
          setMessage('Acima do peso')
        } else if(result === 30 || result <= 34.9) {
          setMessage('Obesidade Grau I')
        } else if(result === 35 || result <= 39.9) {
          setMessage('Obesidade Grau II')
        } else if(result >= 40) {
          setMessage('Obesidade Grau III')
        } else {
          setMessage('Erro ao calcular IMC, tente novamente.')
        }
      }

      setShowIMC(true)
    } else {
      alert("É necessário informar sua altura (em centímetros*) e peso.")
    }
  }

  return (
    <View className='flex-1 justify-center items-center bg-gray-600'>
      <View className=' p-10 border'>
        <Text className='text-4xl text-center text-blue-600 font-bold'>IMC</Text>
        <Text className='text-2xl text-center text-blue-600 font-bold'>Indíce de Massa Corporal</Text>

        <Text className='my-4 text-lg text-justify text-blue-300'>É um cálculo universal adotado pela OMS (Organização Mundial da Saúde) para classificar padrões de saúde relacionados ao peso, como desnutrição e obesidade.</Text>

        <Text className='mb-4 text-2xl text-center text-gray-300 font-bold'>
          IMC = Peso ÷ (Altura × Altura)
        </Text>
        
        <View className='flex-row gap-4'>

          <TextInput 
            className='w-[180px] p-2 border border-blue-600 rounded-lg text-blue-300 font-bold text-center' 
            keyboardType='numeric'
            placeholder='Seu peso em kg' 
            value={ weight }
            onChange={ event => setWeight(event.nativeEvent.text) }
          />

          <TextInput
            className='w-[180px] p-2 border border-blue-600 rounded-lg text-blue-300 font-bold text-center' 
            keyboardType='numeric'
            placeholder='Sua altura em cm' 
            value={ height }
            onChange={ event => setHeight(event.nativeEvent.text) }
          />

        </View>
        <Pressable 
          className='my-4 p-4 w-auto bg-blue-600 rounded-lg'
          onPress={ handleCalcIMC }>
          <Text className='text-gray-100 text-lg text-center'>Calcular</Text>
        </Pressable>


        { showIMC && <View>
          <Text className='my-4 text-lg text-center text-blue-300 font-bold'>
            Peso: { weight }kg | Altura: { height }cm
          </Text>

          <Text className='text-lg text-center text-blue-300'>Seu IMC é { imc.toFixed(1) }</Text>
          
          <Text className='mt-4 text-4xl text-center text-blue-600 font-bold'>{ message }</Text>
        </View> }

        { !showIMC && <View>
          <Text className='my-4 text-lg text-center text-blue-300 font-bold'></Text>

          <Text className='text-lg text-center text-blue-300'></Text>
          
          <Text className='mt-4 text-4xl text-center text-blue-600 font-bold'></Text>
        </View> }

      </View>
    </View>
  )
}


