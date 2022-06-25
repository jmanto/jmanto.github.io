import glob
from PIL import Image, ImageOps

my_images_list = glob.glob("../assets/img/France2021/*.jpg")
print(my_images_list)
for my_image in my_images_list:
    # Download Image:
    im = Image.open(my_image)
    im = ImageOps.exif_transpose(im)

    # Check Image Size
    im_size = im.size

    # Define box inside image
    width = 800
    height = 600

    if im_size[0] > width:
        left = (im_size[0] - width)/2
    else:
        left = 0
        width = im_size[0]

    if im_size[1] > height:
        top = (im_size[1] - height)/2   
    else:
        top = 0
        height = im_size[1]

    # Create Box
    box = (left, top, left+width, top+height)

    # Crop Image
    area = im.crop(box)
    #area.show()

    # Save Image
    filename = my_image.split("\\")
    area.save(f"{filename[0]}/crop-{filename[1]}", "PNG")