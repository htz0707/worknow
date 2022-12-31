import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import Cropper from 'react-easy-crop';
import { Slider } from 'antd';
import '../assets/styles/UploadAvatarModal.scss';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import axios from 'axios';
import { handleError, handleMessage } from '../helpers/helpers';
import { ReactComponent as PictureIcon } from '../assets/icons/picture.svg';
import { ReactComponent as BigPictureIcon } from '../assets/icons/bigpicture.svg';
import { useAuthContext } from '../context/auth';

export default function UploadAvatarModal(props) {
  const { updateUser } = useAuthContext();
  const { show, file, handleClose } = props;
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const [croppedArea, setCroppedArea] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };
  const createImage = (url) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
      image.src = url;
    });
  const getRadianAngle = (degreeValue) => {
    return (degreeValue * Math.PI) / 180;
  };
  function rotateSize(width, height, rotation) {
    const rotRad = getRadianAngle(rotation);

    return {
      width:
        Math.abs(Math.cos(rotRad) * width) +
        Math.abs(Math.sin(rotRad) * height),
      height:
        Math.abs(Math.sin(rotRad) * width) +
        Math.abs(Math.cos(rotRad) * height),
    };
  }
  const getCroppedImg = async (
    imageSrc,
    pixelCrop,
    rotation = 0,
    flip = { horizontal: false, vertical: false }
  ) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return null;
    }

    const rotRad = getRadianAngle(rotation);

    // calculate bounding box of the rotated image
    const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
      image.width,
      image.height,
      rotation
    );

    // set canvas size to match the bounding box
    canvas.width = bBoxWidth;
    canvas.height = bBoxHeight;

    // translate canvas context to a central location to allow rotating and flipping around the center
    ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
    ctx.rotate(rotRad);
    ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
    ctx.translate(-image.width / 2, -image.height / 2);

    // draw rotated image
    ctx.drawImage(image, 0, 0);

    // croppedAreaPixels values are bounding box relative
    // extract the cropped image using these values
    const data = ctx.getImageData(
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height
    );

    // set canvas width to final desired crop size - this will clear existing context
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // paste generated rotate image at the top left corner
    ctx.putImageData(data, 0, 0);

    // As Base64 string
    // return canvas.toDataURL('image/jpeg');

    // As a blob
    return canvas;
  };
  const generateDownload = async (imageSrc, crop) => {
    if (!crop || !imageSrc) {
      return;
    }
    setLoading(true);
    const canvas = await getCroppedImg(imageSrc, crop);
    canvas.toBlob((blob) => {
      handleUpload(blob, imageName);
    });
  };
  const onDownload = () => {
    generateDownload(image, croppedArea);
  };
  // handle upload image
  const [loading, setLoading] = useState(false);
  const UPDATE_ME = gql`
    mutation UpdateMe($avatarId: UUID!) {
      updateMe(data: { avatarId: $avatarId }) {
        avatar
      }
    }
  `;
  const [updateMe] = useMutation(UPDATE_ME, {
    update(_, { data: { updateMe: userData } }) {
      handleMessage('success', 'Cập nhật thành công.');
      updateUser(userData);
    },
    onError(err) {
      console.log(err);
      handleMessage(
        'error',
        handleError(err.graphQLErrors[0]?.message, 'Cập nhật không thành công.')
      );
    },
  });
  const CREATE_UPLOAD_URL = gql`
    mutation CreateUploadUrl($fileName: String!, $contentType: String!) {
      createUploadUrl(
        data: { fileName: $fileName, contentType: $contentType }
      ) {
        presignUrl
        fileId
      }
    }
  `;
  const [createUploadUrl] = useMutation(CREATE_UPLOAD_URL);
  const UPDATE_UPLOAD_URL = gql`
    mutation UpdateUploadUrl($fileId: UUID!) {
      updateUploadUrl(data: { fileId: $fileId }) {
        publicUrl
        status
      }
    }
  `;
  const [updateUploadUrl] = useMutation(UPDATE_UPLOAD_URL);
  const handleUpload = async (file, file_name) => {
    try {
      setLoading(true);
      let res1 = await createUploadUrl({
        variables: {
          fileName: file_name,
          contentType: file.type,
        },
      });
      if (res1.data) {
        var config = {
          method: 'put',
          url: res1.data.createUploadUrl.presignUrl,
          headers: {
            'Content-Type': file?.type,
          },
          data: file,
        };
        let res2 = await axios(config);
        if (res2.statusText === 'OK') {
          let res3 = await updateUploadUrl({
            variables: {
              fileId: res1.data.createUploadUrl.fileId,
            },
          });
          updateMe({
            variables: {
              avatarId: res1.data.createUploadUrl.fileId,
            },
          });
          setLoading(false);
          handleClose();
        }
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      handleClose();
      handleMessage('error', 'Tải ảnh không thành công.');
    }
  };
  const handleInit = (file) => {
    setImageName(file.name);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener('load', () => {
      setImage(reader.result);
    });
  };
  useEffect(() => {
    if (file) {
      handleInit(file);
    }
  }, [file]);
  return (
    <Modal
      show={show}
      //onHide={handleClose}
      backdrop='static'
      keyboard={false}
      aria-labelledby='contained-modal-title-vcenter'
      centered
      className='upload-avatar-modal'
    >
      <Modal.Header className='modal-header'>
        <div className='title'>Upload Ảnh</div>
      </Modal.Header>
      <Modal.Body className='modal-body p-3'>
        <div className='mb-2'>
          <div style={{ position: 'relative', height: '250px' }}>
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape='round'
              showGrid={false}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
          <div className='slide-custom'>
            <PictureIcon className='small-icon' />
            <div className='slide-container'>
              <Slider
                tipFormatter={null}
                trackStyle={{ backgroundColor: '#FFB31F' }}
                handleStyle={{
                  borderColor: '#fe7b50',
                  boxShadow: '0 0 0 0.25rem rgb(254 123 80 / 25%)',
                }}
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(zoom) => setZoom(zoom)}
              />
            </div>
            <BigPictureIcon className='big-icon' />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className='modal-footer'>
        <button className='btn-cancel' onClick={handleClose}>
          Hủy
        </button>
        <button className='btn-save' onClick={onDownload}>
          {loading ? <Spinner animation='border' size='sm' /> : 'Lưu'}
        </button>
      </Modal.Footer>
    </Modal>
  );
}
