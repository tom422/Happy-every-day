<template>
  <div class="footer-area">
    <!-- FOOTER START -->
    <el-row class="">
      <el-col :span="20" :offset="2">
        <div>
          <div class="tp-border"></div>
          <div class="footer_bottom">
            <el-row>
              <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="24">
                <div class="footer-record">
                  <span>
                    <a
                      class="footer-link"
                      href="https://beian.miit.gov.cn/"
                      target="_blank"
                      >皖ICP备2023004430号
                    </a>
                  </span>
                </div>
              </el-col>
              <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="24">
                <div class="footer_right">
                  <a
                    href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                  </a>
                  <img src="../../assets/images/gaba.png" />
                  皖公网安备 42018502003215号
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- FOOTER END -->
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.footer-area {
  /* background: #f9fdfa; */
  padding-top: 40px;
  padding-top: 20px;
}

.tp-border {
  border-top: 1px solid #e4ecee;
}

.footer_bottom {
  color: var(--fontColor);
  padding: 20px 0;
  vertical-align: middle;
}

.footer_right {
  /* line-height: 40px; */
  
  text-align: right;
}

.footer_right  img {
    vertical-align: middle;
}
</style>
