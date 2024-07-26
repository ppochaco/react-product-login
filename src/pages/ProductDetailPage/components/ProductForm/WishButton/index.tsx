import { useState } from 'react';

import { Button, Text, useDisclosure } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

import { AddWish } from '@/api/services/wish';
import heart from '@/assets/icons/heart-regular.svg';
import { API_ERROR_MESSAGES } from '@/constants/errorMessage';

import { Alert } from '@/components/ui/Dialog/Alert';
import { Container } from '@/components/ui/Layout/Container';

export const WishButton = ({ productId }: { productId: string }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [alertMessage, setAlertMessage] = useState('');

  const { mutate, status } = useMutation({
    mutationFn: AddWish,
    onSuccess: (data) => {
      setAlertMessage('위시 리스트에 추가했습니다.');
      onOpen();
      console.log(data);
    },
    onError: () => {
      setAlertMessage(API_ERROR_MESSAGES.UNKNOWN_ERROR);
    },
  });

  return (
    <Button
      width="5rem"
      height="5rem"
      onClick={() => mutate({ productId })}
      disabled={status === 'pending'}
    >
      <Container flexDirection="column" alignItems="center">
        <img src={heart} alt="wish-icon" width={32} />
        <Text>38,201</Text>
      </Container>
      {isOpen && (
        <Alert message={alertMessage} isOpen={isOpen} onClose={onClose} />
      )}
    </Button>
  );
};
