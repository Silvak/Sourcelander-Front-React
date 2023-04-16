import cv2
cap = cv2.VideoCapture('video.mp4')

while(cap.isOpened()):
    ret, frame = cap.read()

    if ret == True:
    # Mostrar el fotograma actual
    cv2.imshow('Frame',frame)

    # Esperar 25ms antes de pasar al siguiente fotograma
    if cv2.waitKey(25) & 0xFF == ord('q'):
        break
    
    # Si el número del fotograma actual está en la lista de fotogramas seleccionados, guardarlo en la carpeta correspondiente
    if cap.get(cv2.CAP_PROP_POS_FRAMES) in [10, 50, 100]:
        cv2.imwrite(f'fotogramas_seleccionados/fotograma_{cap.get(cv2.CAP_PROP_POS_FRAMES)}.jpg', frame)
        
else:
    break
cap.release()
cv2.destroyAllWindows()