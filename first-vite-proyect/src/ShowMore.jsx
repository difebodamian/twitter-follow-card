import './App.css'

export function ShowMore() {
    return(
      <div className='tw-followCard-showMore'>
        <div class="yotpo yotpo-main-widget"
          data-product-id="{{product.permalink}}"
          data-price="{{1}}"
          data-currency="{{store.currency}}"
          data-name="{{messi}}"
          data-url="{{product.url}}"
          data-image-url="{{product.images.first}}"
          data-description="{{product.description}}">
      </div>
      </div>
    )
}