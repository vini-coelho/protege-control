import React from 'react';
import { View, Modal, FlatList } from 'react-native';

import { Container, TextWrapper, ItemText, Card } from './styles';

const ListModal = ({visible, onRequestClose, closeModal, itemList, onItemClick}) => {
  
    const onClick = (item) => {
        onItemClick(item)
        closeModal()
    }

    return(
      <Modal 
        visible={visible}
        onRequestClose={onRequestClose}
        transparent={true}>
          <Container onPress={closeModal}>
              <Card>
                <FlatList
                data={itemList}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <TextWrapper onPress={()=>onClick(item)}>
                        <ItemText >{item.name}</ItemText>
                    </TextWrapper>
                )}
                />
              </Card>
          </Container>
      </Modal>
  );
}

export default ListModal;