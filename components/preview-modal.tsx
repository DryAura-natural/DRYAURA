"use client";
import usePreviewModal from "@/hooks/use-preview-model";
import Modal from "./ui/model";
import Gallery from "./gallerys";
import Info from "./info";

const PreviewModel = () => {
  const PreviewModal = usePreviewModal();
  const product = usePreviewModal((state) => state.data);

  if (!product) {
    return null;
  }

  return (
    <Modal open={PreviewModal.isOpen} onClose={PreviewModal.onClose}>
      <div className="  grid w-full grid-cols-1 items- start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
            <div className="sm:col-span lg:col-span-5">
                  <Gallery images={product.images}/>


            </div>
            <div className="sm:col-span-8 lg:col-span-7">
                  <Info data={product}showDescription={false}/>
                  

            </div>

      </div>
    </Modal>
  );
};
export default PreviewModel;
