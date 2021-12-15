import React from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const Main = () => {
  const data = [
    {
      id: "1",
      title: "A Revolução dos Bichos",
      anotations: "Escrita em plena Segunda Guerra Mundial e publicada em 1945 depois de ter sido rejeitada por várias editoras, essa pequena narrativa causou desconforto ao satirizar ferozmente a ditadura stalinista numa época em que os soviéticos ainda eram aliados do Ocidente na luta contra o eixo nazifascista. De fato, são claras as referências: o despótico Napoleão seria Stálin, o banido Bola-de-Neve seria Trotsky, e os eventos políticos - expurgos, instituição de um estado policial, deturpação tendenciosa da História - mimetizam os que estavam em curso na União Soviética. Com o acirramento da Guerra Fria, as mesmas razões que causaram constrangimento na época de sua publicação levaram A revolução dos bichos a ser amplamente usada pelo Ocidente nas décadas seguintes como arma ideológica contra o comunismo. O próprio Orwell, adepto do socialismo e inimigo de qualquer forma de manipulação política, sentiu-se incomodado com a utilização de sua fábula como panfleto. Depois das profundas transformações políticas que mudaram a fisionomia do planeta nas últimas décadas, a pequena obra-prima de Orwell pode ser vista sem o viés ideológico reducionista. Mais de sessenta anos depois de escrita, ela mantém o viço e o brilho de uma alegoria perene sobre as fraquezas humanas que levam à corrosão dos grandes projetos de revolução política. É irônico que o escritor, para fazer esse retrato cruel da humanidade, tenha recorrido aos animais como personagens. De certo modo, a inteligência política que humaniza seus bichos é a mesma que animaliza os homens.",
      read: false,
      photo: null,
    },
    {
      id: "2",
      title: "Crime e Castigo",
      anotations: "Publicado em 1860, 'Crime e Castigo' é a obra mais célebre de Dostoievski. Neste livro, Raskólnikov, um jovem estudante, pobre e desesperado, perambula pelas ruas de São Petersburgo até cometer um crime que tentará justificar por uma teoria - grandes homens, como César ou Napoleão, foram assassinos absolvidos pela História. Este ato desencadeia uma narrativa labiríntica que arrasta o leitor por becos, tabernas e pequenos cômodos, povoados de personagens que lutam para preservar sua dignidade contra as várias formas da tirania.",
      read: false,
      photo: null,
    },
    {
      id: "3",
      title: "1984",
      anotations: "Publicada originalmente em 1949, a distopia futurista 1984 é um dos romances mais influentes do século XX, um inquestionável clássico moderno. Lançada poucos meses antes da morte do autor, é uma obra magistral que ainda se impõe como uma poderosa reflexão.",
      read: false,
      photo: null,
    },
  ]

  return(
    <View style={styles.container}>
      <View style={styles.toolbox}>
        <Text style={styles.title}>Reading List</Text>
        <TouchableOpacity style={styles.toolboxButton}>
          <Icon name="add" size={14} color="#fff"/>
        </TouchableOpacity>
      </View>
      <FlatList 
        data={data} 
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemButton}>
            <Text style={styles.itemText}>{item.title}</Text>
          </TouchableOpacity>
        )} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  toolbox: {
  flexDirection: "row",
  marginBottom: 10,
  },
  title: {
  flex: 1,
  fontSize: 16,
  color: "#3498db",
  },
  toolboxButton: {
  backgroundColor: "#3498db",
  borderRadius: 50,
  width: 22,
  height: 22,
  justifyContent: "center",
  alignItems: "center",
  },
  itemButton: {

  },
  itemText: {
    fontSize: 16,
  }
});

export default Main;