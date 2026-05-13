<script lang="ts" setup>
definePage({
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '隐私政策',
  },
})

function leftClick() {
  const pages = getCurrentPages()
  if (pages.length > 1) {
    uni.navigateBack({ delta: 1 })
  }
}
</script>

<template>
  <view>
    <!-- 导航栏 -->
    <view
      class="fixed top-0 left-0 w-full z-2 h-90px flex items-center"
      style="background: linear-gradient(180deg, #E5F9FF 0%, #F7F6FB 100%)"
    >
      <view class="flex flex-row flex-nowrap w-full pt-20px mx-15px items-center justify-between">
        <view class="flex-2 min-w-0">
          <view @click="leftClick">
            <image src="/static/gamedetail/back_icon.png" mode="aspectFit" class="w-25px h-25px" />
          </view>
        </view>
        <view class="flex-2 min-w-0 text-center text-18px text-[#272E3B]">隐私政策</view>
        <view class="flex-2 min-w-0" />
      </view>
    </view>

    <!-- 隐私政策内容 -->
    <scroll-view scroll-y class="privacy-scroll">
      <view class="privacy-wrap">
        <view class="p-item indent-2em">
          本政策适用于您使用酷鸭手游的所有产品和服务。当您使用我们的产品或服务时，我们可能会收集、使用、存储和共享您的个人信息。本隐私政策将详细说明我们如何收集、使用、存储和共享您的个人信息，以及您对这些信息所享有的权利。
        </view>
        <view class="p-item indent-2em">
          请您仔细阅读本隐私政策，以了解我们对您个人信息的处理方式。如果您不同意本隐私政策中的任何条款，请停止使用我们的产品或服务。
        </view>
        <view class="p-item indent-2em">
          本隐私政策可能会不时更新，我们会在专门页面上发布对隐私权政策所做的任何变更。对于重大变更，我们还会提供更为显著的通知（包括但不限于网站公示、弹窗、公告、邮件等方式进行通知或提示）。关于本隐私政策有关的个人信息处理发生变更的，我们会重新取得您的同意。
        </view>

        <view class="p-title">目录</view>
        <view class="p-item">1、我们如何收集和使用您的信息</view>
        <view class="p-item">2、我们如何使用 Cookie 和同类技术</view>
        <view class="p-item">3、我们如何共享、转让、公开披露您的个人信息</view>
        <view class="p-item">4、我们如何保护您的个人信息安全</view>
        <view class="p-item">5、您如何管理您的个人信息</view>
        <view class="p-item">6、我们如何处理未成年人的个人信息</view>
        <view class="p-item">7、您的个人信息如何在全球范围转移</view>
        <view class="p-item">8、本隐私权政策如何更新</view>
        <view class="p-item">9、如何联系我们</view>

        <view class="p-title">一、我们如何收集和使用您的信息</view>
        <view class="p-item">
          我们会出于本政策所述的以下目的，收集、存储和使用下列与您有关的个人信息。如果您不提供相关信息，可能无法注册成为我们的用户或无法享受我们提供的某些产品或服务，或者无法达到相关服务拟达到的效果。
        </view>

        <view class="p-subtitle">（一）帮助您成为我们的用户</view>
        <view class="p-item">
          为帮助您成为我们的用户，即完成账号的创建，以便我们为您提供用户服务。当您注册酷鸭手游账号时，我们会收集您提供的手机号码、用户名，收集您的这些信息是为了帮助您完成酷鸭手游账号注册，成为我们的注册用户，保护您的账号安全。如果您拒绝提供这些信息，您可能无法正常注册酷鸭手游账号，亦无法享受我们提供的基于账号的功能服务和推荐，但不影响您使用本款产品的其他功能。
        </view>

        <view class="p-subtitle">（二）向您提供产品或服务</view>
        <view class="p-item">1、您向我们提供的信息</view>
        <view class="p-item">
          为便于您使用我们的产品或服务，需要您根据产品或服务的内容，选择填写或提交使用产品或服务所必须的信息，有时可能还需要您提供身份信息、联系方式、支付交易帐号等个人敏感信息。
        </view>
        <view class="p-item">2、我们在您使用产品或服务过程中收集的信息</view>
        <view class="p-item">包括账号信息、身份信息、设备信息、日志信息、网络环境。</view>
        <view class="p-item">
          其中设备信息是指，为保证正常使用我们的产品和服务，维护游戏基础功能的正常运行，提升您的用户体验并保证您的账号安全，我们会根据您在软件安装及使用中授予的具体权限，接收并记录您所使用的设备相关信息（MAC 地址、浏览器 UA 标识、手机 ROM 厂商、安卓系统版本、IMEI 号、手机型号、当前网络类型、匿名设备标识符 oaid、androidID、移动应用列表软硬件特征信息、传感器信息、粘贴板信息）。
        </view>
        <view class="p-item">3、为您提供本地游戏识别，游戏安装包下载，删除功能。</view>
        <view class="p-item">
          在您使用我们产品时，我们会尝试读取您设备上的移动应用列表，找出已安装的游戏信息，让您在"我的游戏"功能里享受我们的便捷服务。
        </view>
        <view class="p-item">4、帮助您完成支付、及时了解订单等信息动态</view>
        <view class="p-item">
          为购买酷鸭手游/游戏的增值服务，您需要选择支付方式并提供相应支付账号，我们会记录您的订单号、订单交易金额信息、订单状态与您选择的付款方式。
        </view>
        <view class="p-item">5、为您提供更换头像，上架角色交易商品信息补全功能</view>
        <view class="p-item">
          在您使用我们产品时，可随时更换您喜爱的图片作为头像；另外，在您需要出售游戏角色时，可以上传与游戏角色相关的截图等信息。
        </view>
        <view class="p-item">6、为您提供账号登录，售后等服务</view>
        <view class="p-item">
          在您使用我们产品时，需要您提供手机号码作为登录凭证。另外，当您对我们的产品及/或服务产生疑问时，可随时联系客服进行处理。
        </view>
        <view class="p-item">7、实名认证</view>
        <view class="p-item">
          根据国家相关法律法规、部门规章，严格落实网络游戏未成年人防沉迷系统要求，在酷鸭手游 APP 购买虚拟商品或进入游戏里面体验游戏，您需要提供您的真实身份信息（真实姓名、身份证号码）以完成实名验证。
        </view>
        <view class="p-item">8、第三方 SDK 接入要求</view>
        <view class="p-item">
          为保障酷鸭手游 App 相关功能的实现，我们会接入由第三方提供的软件开发包（SDK）实现相关功能。
        </view>

        <view class="p-subtitle">（三）为您提供安全保障</view>
        <view class="p-item">
          为确保用户身份真实性、向您提供更好的安全保障，您可以向我们提供身份证个人敏感信息完成实名认证。为提高您使用我们及我们关联公司、合作伙伴提供产品或服务的安全性，我们可能使用或整合您的用户信息、行为信息、设备信息来综合判断您账号状态及交易风险。
        </view>

        <view class="p-subtitle">（四）其他用途</view>
        <view class="p-item">
          我们将信息用于本政策未载明的其他用途，或者将基于特定目的收集而来的信息用于其他目的时，会事先征求您的同意。
        </view>

        <view class="p-title">二、我们如何使用 Cookie 和同类技术</view>
        <view class="p-item">
          Cookie 和同类技术是互联网中的通用常用技术。当您使用我们的游戏产品或服务时，我们可能会使用相关技术向您的设备发送一个或多个 Cookie 或匿名标识符，以收集和存储您访问、使用游戏产品的信息。
        </view>

        <view class="p-title">三、我们如何共享、转让、公开披露您的个人信息</view>
        <view class="p-item">
          我们只会在以下情况下共享您的个人信息：（1）获得您的明确同意；（2）为实现本隐私政策所述的目的所必需；（3）根据法律法规的要求。
        </view>

        <view class="p-title">四、我们如何保护您的个人信息安全</view>
        <view class="p-item">
          我们非常重视您的个人信息安全，采取了一系列技术和管理措施来保护您的个人信息不被未经授权的访问、使用、披露或损坏。包括数据加密、访问控制、安全漏洞管理等技术措施，以及员工培训、安全管理制度等管理措施。
        </view>

        <view class="p-title">五、您如何管理您的个人信息</view>
        <view class="p-item">
          您对自己的个人信息享有访问权、更正权、删除权、撤回同意权、投诉和举报权等多种权利。您可以通过登录酷鸭手游账号在相关页面进行操作，或通过我们提供的联系方式联系我们。
        </view>

        <view class="p-title">六、我们如何处理未成年人的个人信息</view>
        <view class="p-item">
          我们非常重视未成年人的个人信息保护。如果您是未成年人，在使用我们的产品和服务之前，请确保您已经获得了您的监护人的同意。我们不会主动收集未成年人的个人信息，除非获得了监护人的明确同意。
        </view>

        <view class="p-title">七、您的个人信息如何在全球范围转移</view>
        <view class="p-item">
          如果我们需要将您的个人信息转移到境外，我们会确保遵守相关法律法规的要求，采取必要的措施保护您的个人信息安全。
        </view>

        <view class="p-title">八、本隐私权政策如何更新</view>
        <view class="p-item">
          本隐私政策可能会根据业务发展、法律法规要求等情况进行更新。我们会在专门页面上发布对隐私权政策所做的任何变更。对于重大变更，我们还会提供更为显著的通知。
        </view>

        <view class="p-title">九、如何联系我们</view>
        <view class="p-item">
          如果您对本隐私政策有任何疑问、意见或建议，或者您在使用我们的产品和服务过程中遇到任何与个人信息保护相关的问题，您可以通过以下方式联系我们：
        </view>
        <view class="p-item">邮箱：kai2020212@88.com</view>
        <view class="p-item" style="padding-bottom: 30px">
          我们将在法定期限或15个工作日内回复您。如果您对我们的回复不满意，特别是您认为我们的个人信息处理行为损害了您的合法权益，您还可以通过向广州互联网法院提起诉讼来寻求解决方案。
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<style>
.privacy-scroll {
  padding-top: 90px;
  height: 100vh;
  box-sizing: border-box;
}

.privacy-wrap {
  margin: 0 15px;
  font-size: 14px;
  color: #333;
}

.p-item {
  display: block;
  line-height: 16px;
  margin-bottom: 12px;
  word-break: break-all;
}

.p-title {
  display: block;
  font-size: 16px;
  font-weight: 700;
  line-height: 16px;
  margin-top: 20px;
  margin-bottom: 10px;
}

.p-subtitle {
  display: block;
  font-size: 15px;
  font-weight: 600;
  line-height: 16px;
  margin-top: 16px;
  margin-bottom: 8px;
}

.indent-2em {
  text-indent: 2em;
}
</style>
